import React, { useEffect, useRef, useState } from "react";
import useHttp from "../Hooks/use-http";
import { loadAllData, loadHome } from "../lib/request";
import { caterogries } from "../Data/data";
import CatergoryList from "../components/catergories/CatergoryList";
import classes from "./Home.module.css";
import Header from "../components/Layout/Header";
import { useInView } from "react-intersection-observer";
import useObserve from "../Hooks/use-observe";

export default function Home() {
//   const {
//     ref: containerRef,
//     inView: sticky,
//   } = useInView();
    const containerRef = useRef()
    const {sticky} = useObserve(containerRef, '-20px')
  return (
    <>
      <Header sticky={sticky} />
      <div className={classes.filler} ref={containerRef}></div>
      <div
        className={`${
          sticky === false ? `${classes.sticky} ${classes.catergory}` : classes.catergory
        }`}
      >
        {caterogries.map((catergory) => {
          // console.log(catergory)
          return <CatergoryList catergory={catergory} />;
        })}
      </div>
    </>
  );
}

// // fetch("https://v1.nocodeapi.com/dannzy/spotify/zPUyedlrPGjpPaxn/browse/categories?perPage=5").then(res => {
// //     return res.json()
// // }).then(data => {
// //     console.log(data)
// // })
// const { sendRequest, isLoading, data: loadedData } = useHttp(loadHome, true)
// const {sendRequest:fetchRequest, data:fetchedData } = useHttp(loadAllData)
// useEffect(() => {
//     sendRequest()
//     // fetchRequest(loadedData)

// }, [sendRequest])

// if (isLoading === 'pending') {
//     return 'Loading'
// }
// console.log(loadedData)
