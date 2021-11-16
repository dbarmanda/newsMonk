import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  //articles in an array of objects(news items details)
  //this is what JSON gives (isi ka matlab json data ka format)

  static defaultProps={
    country: 'in',
    pageSize: 11,
    category: 'general'
  }

  static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  capitalizeFirst= (word)=>{
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  constructor(props) {
    super(props);

    //defining state in constructor
    this.state = {
      articles: [],
      loading: true,
      //to switch for next contents a var(will change to switch)
      page: 1,
      totalResults: 0
    };

    

    document.title = `${this.capitalizeFirst(this.props.category)} - newsMonk Get your daily dose of ${this.props.category} here!!`
  }


  //Refactoring news componenet by making function to make fetch calls

  async updateNews(){
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f1134af9a2da439e8aaa37cda9871392&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    // this.setState({loading: true});

    let fetchedData = await fetch(url); 
    let parsedData = await fetchedData.json();

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  fetchMoreData = async () => {
    this.setState({page: this.state.page + 1});

    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f1134af9a2da439e8aaa37cda9871392&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    // this.setState({loading: true});

    let fetchedData = await fetch(url); 
    let parsedData = await fetchedData.json();

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  /*Fetch API
                using -  "componentDidMount'

*/

  async componentDidMount() {
   
    this.updateNews();
  }

  

  // {}   JavaScript sirf return ke andar hi likhate h idhar saare methods aayenge

  render() {
    console.log("render sir!");

    return (
      <>
        {/* prints all articles(array items): objects!  */}
        {/* {this.state.articles.map((element)=>{console.log(element)})}; */}
        {/* <div className="container my-3"> */}
          <h2 className="my-4 text-center">newsMonk - Top {this.capitalizeFirst(this.props.category)}   Headlines</h2>
          {/* {this.state.loading && <Spinner />}   here we are addin the infinite scroll*/}
          {this.state.loading && <Spinner />}

          {/*

            What happened when we used loading wala logic?
              ---} jab loading nahi ho tab render newsItems else show loading spinner

            Now what are we doing?
              ---} ab render nahi concate karde dom me newsItems ko (with spinner logic me kahi use kiya check kar bsdk!!)

          */}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container my-3">
          <div className="row container">
            {!this.state.loading && this.state.articles.map((element) => {
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
                      element.urlToImage ? element.urlToImage : "https://english.cdn.zeenews.com/sites/default/files/2021/11/15/987793-oneplus-10-pro.jpg"
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
  }
}

export default News;
