"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { IMAGES } from "../constant/theme";
import { Autoplay, Navigation } from "swiper/modules";
import Link from "next/link";
import "swiper/css/navigation";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import Image from "next/image";

// ✅ Toggle here (dummy now, API later)
const USE_GOOGLE_API = false;

// ✅ Dummy data (Google-like shape)
const dummyGoogleReviews = [
    {
        author_name: "Amit Sharma",
        rating: 5,
        text: "Amazing experience. Staff was professional and the process was smooth.",
        profile_photo_url: IMAGES.smallavatar1,
        relative_time_description: "2 weeks ago",
    },
    {
        author_name: "Sarah Johnson",
        rating: 4,
        text: "Great service and friendly team. Facility is clean and well managed.",
        profile_photo_url: IMAGES.smallavatar2,
        relative_time_description: "1 month ago",
    },
    {
        author_name: "Rahul Verma",
        rating: 5,
        text: "Highly recommended! Excellent support and good results.",
        profile_photo_url: IMAGES.smallavatar3,
        relative_time_description: "3 weeks ago",
    },
    {
        author_name: "Emily Watson",
        rating: 5,
        text: "Professional and kind. Booking was easy and everything explained well.",
        profile_photo_url: IMAGES.smallavatar4,
        relative_time_description: "1 week ago",
    },
];

// ⭐ Helper: render stars
const Stars = ({ rating = 5 }) => {
    const r = Math.max(0, Math.min(5, Math.round(rating)));
    return (
        <ul className="star-list">
            {Array.from({ length: 5 }).map((_, idx) => (
                <li key={idx}>
                    <i className={`fa fa-star${idx < r ? "" : "-o"}`} />
                </li>
            ))}
        </ul>
    );
};

function RealPatient() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e: any) => {
        e?.preventDefault?.();
        setShow(true);
    };

    // Reviews state (dummy first, then API)
    const [reviews, setReviews] = useState(dummyGoogleReviews);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!USE_GOOGLE_API) return;

        const fetchReviews = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/google-reviews");
                const data = await res.json();
                setReviews(Array.isArray(data) ? data : []);
            } catch (e) {
                console.error(e);
                setReviews(dummyGoogleReviews); // fallback
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    return (
        <>
            <div className="container">
                <div className="row content-wrapper style-2">
                    <div className="col-xl-6">
                        <div className="content-media">
                            <div className="dz-media">
                                <Image src={IMAGES.about2png} alt="" />
                            </div>

                            <div
                                className="circle-wrapper"
                                data-bottom-top="transform: translateY(50px)"
                                data-top-bottom="transform: translateY(-50px)"
                            >
                                <span className="circle1">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                                <span className="circle2">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </div>

                            <div
                                className="item1"
                                data-bottom-top="transform: translateY(50px)"
                                data-top-bottom="transform: translateY(-50px)"
                            >
                                <div className="info-widget style-1 move-3">
                                    <div className="avatar-group">
                                        <Image className="avatar rounded-circle avatar-sm border border-white border-2" src={IMAGES.smallavatar1} alt="" />
                                        <Image className="avatar rounded-circle avatar-sm border border-white border-2" src={IMAGES.smallavatar2} alt="" />
                                        <Image className="avatar rounded-circle avatar-sm border border-white border-2" src={IMAGES.smallavatar3} alt="" />
                                        <Image className="avatar rounded-circle avatar-sm border border-white border-2" src={IMAGES.smallavatar4} alt="" />
                                    </div>
                                    <div className="clearfix ms-2">
                                        <span className="number text-primary">150k</span>
                                        <span>Patient recovers</span>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="item2"
                                data-bottom-top="transform: translateY(50px)"
                                data-top-bottom="transform: translateY(-50px)"
                            >
                                <div className="info-widget style-3 move-1">
                                    <div className="widget-head">
                                        <div className="widget-media">
                                            <Image src={IMAGES.smallavatar5} alt="" />
                                        </div>
                                        <div className="widget-content">
                                            <h6 className="title">Dr. Natali jackson</h6>
                                            <Stars rating={5} />
                                        </div>
                                    </div>
                                    <p>“It is a long established fact that a reader will be distracted by the readable content”</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-10 align-self-center m-b30">
                        <div className="section-head style-1 m-b30 wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.7s">
                            <h2 className="title text-white m-b0">Real Patients, Real Stories. And our achievements</h2>
                        </div>

                        <div className="swiper-btn-center-lr wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.7s">
                            <Swiper
                                className="swiper testimonial-swiper1"
                                slidesPerView={1}
                                spaceBetween={20}
                                loop={true}
                                autoplay={{ delay: 3000 }}
                                navigation={{
                                    nextEl: ".swiper1-button-next",
                                    prevEl: ".swiper1-button-prev",
                                }}
                                modules={[Navigation, Autoplay]}
                            >
                                {(loading ? dummyGoogleReviews : reviews).map((review, i) => (
                                    <SwiperSlide key={i}>
                                        <div className="testimonial-1 shadow-md">
                                            <div className="dz-media">
                                                <div className="media-inner">
                                                    <Image
                                                        src={review.profile_photo_url || IMAGES.smallavatar1}
                                                        alt={review.author_name || "Google Reviewer"}
                                                        width={80}
                                                        height={80}
                                                    />
                                                </div>

                                                <div className="testimonial-info">
                                                    <h5 className="testimonial-name">{review.author_name}</h5>
                                                    <span className="testimonial-position">
                                                        <Stars rating={review.rating} />
                                                        <span style={{ marginLeft: 8 }}>
                                                            {review.relative_time_description || "Google Review"}
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="testimonial-detail">
                                                <div className="testimonial-text">
                                                    <h3 className="title">Google Review</h3>
                                                    <p>{review.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>


                            <div className="swiper1-button-prev btn-prev" role="button">
                                <Image src={IMAGES.arrowleft} alt="" />
                            </div>
                            <div className="swiper1-button-next btn-next" role="button">
                                <Image src={IMAGES.arrowright} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} centered>
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/o8OgzQdA70c?si=Kgb2auDFo3tH4oRZ"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </Modal>
        </>
    );
}

export default RealPatient;
