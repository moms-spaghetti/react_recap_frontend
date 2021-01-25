import React from "react";
import "./card.css";
import { Link } from "react-router-dom";

export default function Card({ data }) {
  return (
    <Link to={`/videoviewer/${data.id}`}>
      <div className="card">
        <ul>
          <li>id: {data.id}</li>
          <li>title: {data.title}</li>
          <li>lecturer: {data.lecturer}</li>
          <p>Tags:</p>
          <ul>
            {data.tags.map((tag) => (
              <li>{tag}</li>
            ))}
          </ul>
        </ul>
      </div>
    </Link>
  );
}
