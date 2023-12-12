import React from 'react';
import { useEffect } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from 'react';


const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalresults] = useState(0)





  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }



  const updateNews = async () => {

    props.setProgress(10)
    console.log("1 update data starting");
    setLoading(true);

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pagesize}`;
    let data = await fetch(url);
    props.setProgress(30);
    let parsedata = await data.json();
    console.log(parsedata);
    props.setProgress(70)
    console.log("1 update data");

    setArticles(parsedata.articles);
    setTotalresults(parsedata.totalResults);
    setLoading(false);

    props.setProgress(100)
  }


  useEffect(() => {
  document.title = `${capitalize(props.category)}-NewsMonkey`;

    updateNews();
    // eslint-disable-next-line
  }, [])




  // const handlePreviousClick = async () => {
    // console.log("prev")
    // this.setState({loading:true});
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c72a9eaef2154ada8653d2f73e33cebb&page=${this.state.page - 1}&pagesize=${props.pagesize}`;
    // let data = await fetch(url);
    // let parsedata = await data.json();
    // console.log(parsedata);
    // this.setState(
    //   {
    //     articles: parsedata.articles,
    //     page: this.state.page - 1,
    //     loading:false
    //   })
  //   setPage(page - 1);

  //   updateNews();

  // }


  // const handleNextClick = async () => {
    // console.log("Next")
    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / props.pagesize))) {

    //   this.setState({loading:true});
    //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c72a9eaef2154ada8653d2f73e33cebb&page=${this.state.page + 1}&pagesize=${props.pagesize}`;
    //   let data = await fetch(url);
    //   let parsedata = await data.json();
    //   console.log(parsedata);
    //   this.setState(
    //     {
    //       articles: parsedata.articles,
    //       page: this.state.page + 1,
    //       loading:false
    //     })
  //   setPage(page + 1);

  //   updateNews();
  // }

  const fetchMoreData = async () => {
    console.log("1", page)
    
    console.log("2", page);
    
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pagesize=${props.pagesize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    console.log("3");

    setArticles(articles.concat(parsedata.articles));
    setTotalresults(parsedata.totalResults);



    console.log(" articles >>>>>>>", articles)
  };





  return (
    <>
      <h1  className='text-center' style={{ margin: "30px",marginTop:"90px" }}>
         NewsMonkey - Top {capitalize(props.category)} Headlines</h1 >
      {loading && <Spinner />}



      <InfiniteScroll InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={< Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {


              return <div className="col-md-4" key={element.url}>

                <NewsItem source={element.source.name} author={element.author} date={element.publishedAt} title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://gaadiwaadi.com/wp-content/uploads/2022/05/toyota-fortuner-GRsport-5.jpg"}
                  newsUrl={element.url} />
              </div>
            })}


          </div>
        </div>

      </InfiniteScroll>

 
    </>
  )

}

News.defaultProps = {
  country: "in",
  pagesize: 8,
  category: "general"
}
News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string
}

export default News;
