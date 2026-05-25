import React, { useEffect, useState } from 'react';
import "./BookDetails.css";

import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";

import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const URL = "https://openlibrary.org/works/";

const BookDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [book, setBook] = useState(null);

    useEffect(() => {

        const fetchBookDetails = async () => {

            setLoading(true);

            try {

                const response = await fetch(
                    `${URL}${id}.json`
                );

                const data = await response.json();

                console.log(data);

                const {
                    description,
                    title,
                    covers,
                    subjects,
                    first_publish_date
                } = data;

                const newBook = {
                    title: title,

                    description:
                        description?.value ||
                        description ||
                        "No description found",

                    cover_img:
                        covers?.length > 0
                            ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`
                            : coverImg,

                    subjects: subjects || [],

                    publishDate:
                        first_publish_date || "Not Available"
                };

                setBook(newBook);

            } catch (error) {
                console.log(error);
            }

            setLoading(false);
        };

        fetchBookDetails();

    }, [id]);

    if (loading) {
        return <Loading />;
    }

    return (
        <section className='bookdetails'>

            <div className='container'>

                <button
                    type='button'
                    className='flex flex-c back-btn'
                    onClick={() => navigate(-1)}
                >
                    <FaArrowLeft size={18} />
                    <span>Go Back</span>
                </button>

                {book ? (

                    <div className='bookdetails-content grid'>

                        <div className='bookdetails-img'>
                            <img
                                src={book.cover_img}
                                alt={book.title}
                            />
                        </div>

                        <div className='bookdetails-info'>

                            <h2 className='bookdetails-title'>
                                {book.title}
                            </h2>

                            <div className='bookdetails-item'>
                                <span className='fw-6'>
                                    First Publish:
                                </span>

                                <span>
                                    {book.publishDate}
                                </span>
                            </div>

                            <div className='bookdetails-item'>
                                <span className='fw-6'>
                                    Subjects:
                                </span>

                                <span>
                                    {book.subjects
                                        .slice(0, 5)
                                        .join(", ")}
                                </span>
                            </div>

                            <div className='bookdetails-item description'>

                                <span className='fw-6'>
                                    Description:
                                </span>

                                <p>
                                    {book.description}
                                </p>

                            </div>

                        </div>

                    </div>

                ) : (

                    <h3>No Book Found</h3>

                )}

            </div>

        </section>
    );
};

export default BookDetails;