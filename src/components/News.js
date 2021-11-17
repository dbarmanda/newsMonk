import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  //articles in an array of objects(news items details)
  //this is what JSON gives (isi ka matlab json data ka format)

  // static defaultProps={
  //   country: 'in',
  //   pageSize: 11,
  //   category: 'general'
  // }
  //modified at the end(function-based syntax)
  // static propTypes={
  //   country: PropTypes.string,
  //   pageSize: PropTypes.number,
  //   category: PropTypes.string,
  // }

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  // constructor(props) {
  //   super(props);

  //   //defining state in constructor
  //   this.state = {
  //     articles: [],
  //     loading: true,
  //     //to switch for next contents a var(will change to switch)
  //     page: 1,
  //     totalResults: 0
  //   };

  //   document.title = `${this.capitalizeFirst(props.category)} - newsMonk Get your daily dose of ${props.category} here!!`
  // }

  const capitalizeFirst = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  //Refactoring news componenet by making function to make fetch calls

  const updateNews = async () => {
    // props.setProgress(20);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=f1134af9a2da439e8aaa37cda9871392&page=${page}&pageSize=${props.pageSize}`;

    // this.setState({loading: true});
    setLoading(true);
    props.setProgress(20);
    let fetchedData = await fetch(url);
    props.setProgress(50);
    let parsedData = await fetchedData.json();
    props.setProgress(80);

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);

    props.setProgress(100);
  };

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=f1134af9a2da439e8aaa37cda9871392&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1); //async function
    //therefore, we set after manual increment

    // this.setState({loading: true});

    let fetchedData = await fetch(url);
    let parsedData = await fetchedData.json();

   
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  
  useEffect(() => {
    document.title = `${capitalizeFirst(props.category)} - newsMonk Get your daily dose of ${props.category} here!!`
    updateNews();
    // eslint-disable-next-line 
  }, []);
  // last error ko hatane ko 
  
  // {}   JavaScript sirf return ke andar hi likhate h idhar saare methods aayenge

  return (
    <>
      
      <h2 className="my-4 text-center">
        newsMonk - Top {capitalizeFirst(props.category)} Headlines
      </h2>
      {/* {this.state.loading && <Spinner />}   here we are addin the infinite scroll*/}
      {loading && <Spinner />}

     
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container my-3">
          <div className="row container">
            {!loading &&
              articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : "no title here"}
                      description={
                        element.description
                          ? element.description
                          : "No description by default"
                      }
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://english.cdn.zeenews.com/sites/default/files/2021/11/15/987793-oneplus-10-pro.jpg"
                      }
                      newsUrl={element.url}
                      alt="Card image cap"
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </InfiniteScroll>

      {/* </div> */}
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 11,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
