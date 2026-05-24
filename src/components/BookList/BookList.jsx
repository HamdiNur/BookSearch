import React from 'react';
import { useGlobalContext } from '../../context';
import Loading from "../Loader/Loader";
import Book from '../BookList/Book'
import coverImg from "../../images/cover_not_found.jpg";
import "./BookList.css";

const BookList = () => {
  const { books, loading, resultTitle } = useGlobalContext();

  const booksWithCovers = books.map((singleBook) => {
    return {
      ...singleBook,
      id: singleBook.id.replace("/works/", ""),
      cover_img: singleBook.cover
        ? singleBook.cover
        : coverImg
    };
  });

  if (loading) {
    return <Loading />;
  }

  console.log(booksWithCovers);

  return (
    <section className='booklist'>
      <div className='container'>
        <h2>{resultTitle}</h2>

<div className='booklist-content grid'>
  {booksWithCovers.map((item) => (
    <Book
      key={item.id}
      book={item}
    />
  ))}
</div>
      </div>
    </section>
  );
};

export default BookList;