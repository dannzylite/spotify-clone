import React, { useRef } from "react";
import { caterogries } from "../Data/data";
import CatergoryList from "../components/catergories/CatergoryList";
import classes from "./Home.module.css";
import Header from "../components/Layout/Header";
import useObserve from "../Hooks/use-observe";

export default function Home() {
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
