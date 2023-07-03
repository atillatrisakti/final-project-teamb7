import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import arrow from "../assets/account/fi_arrow-left.svg";
import bell from "../assets/bell.svg";
import "../styles/Notification.css";
import axios from "axios";
import { toast } from "react-toastify";

const Notification = () => {
  const [notification, setNotification] = useState([]);
  const [detailNotification, setDetailNotification] = useState([]);

  useEffect(() => {
    const getNotification = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${process.env.REACT_APP_API}/customer/notifications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const notif = response.data.data;
        setNotification(notif);
        console.log(notif);

        const detailPromises = notif.map(async (notification) => {
          //   console.log(notification.notification_id);
          const detailResponse = await axios.get(`${process.env.REACT_APP_API}/customer/notifications/${notification.notification_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const detailData = detailResponse.data.data;
          return detailData;
        });

        const detailResults = await Promise.all(detailPromises);
        setDetailNotification(detailResults);
        // console.log(detailResults);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response.data.message);
          return;
        }
        toast.error(error.message);
      }
    };

    getNotification();
  }, []);

  return (
    <>
      <Container className="mt-4">
        <div className="header">
          <h5>Notifikasi</h5>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <div className="list-notif mx-4 mt-3 mb-4">
              <img src={arrow} alt="left-arrow" />
              Beranda
            </div>
          </Link>
        </div>
      </Container>
      <div style={{ border: "1px solid #D0D0D0", boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.10)" }} />
      <Container className="mt-5 ">
        <Container className="mx-5">
          {detailNotification.map((item) => (
            <Row className="mx-5">
              <div className="all-notif my-3" style={{ border: "1px solid #D0D0D0" }}>
                <Col md={6}>
                  <img src={bell} alt="bell" style={{ float: "left" }} className="mt-1" />
                  <p className="ms-5 fw-bold" style={{ margin: "0", fontStyle: "italic" }}>
                    {item[0]?.category}
                  </p>
                  <p className="ms-5 fw-normal" style={{ margin: "0" }}>
                    {item[0]?.notification_title}
                  </p>
                  <p className="ms-5 text-muted" style={{ margin: "0" }}>
                    {item[0]?.notification_description}
                  </p>
                  {/* <div style={{ float: "right" }}>date</div> */}
                </Col>
                <Col md={6}>
                  <p>{new Date(item[0]?.date).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}</p>
                </Col>
              </div>
            </Row>
          ))}
        </Container>
      </Container>
    </>
  );
};

export default Notification;
