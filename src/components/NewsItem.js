import React from "react";

const NewsItem= (props) =>{
    //destructuring props into variables
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className=" my-2">
        <div className="card position-relative">
        <div >

          <span className="badge rounded-pill bg-danger"
                style={{display: 'flex',position: 'absolute', right: '0'}}
          >
            {source}
          </span>
        </div>
          <img
            className="card-img-top"
            src={
              imageUrl
                ? imageUrl
                : "https://english.cdn.zeenews.com/sites/default/files/2021/11/15/987793-oneplus-10-pro.jpg"
            }
            alt=""
          />

          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description.slice(0, 80)}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "devi"} on {new Date(date).toGMTString()}
              </small>
            </p>
            {/* lets format the data  coverst iso to a date string new Date(date) */}
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More..
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;
