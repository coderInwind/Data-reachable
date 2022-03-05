import React, { memo, useRef, useState } from "react";
import { TaskWrapper } from "./style";

const Task = memo(() => {
  const [listIndex, setlistIndex] = useState(1);

  const addInput = useRef();
  const studyRef = useRef();
  // 添加新的study
  const add = () => {
    //创建input元素(在input前创建一个空的div站位)
    const newInput = document.createElement("input");
    const blank = document.createElement("div");
    blank.className = "blank";
    addInput.current.before(newInput);
    newInput.before(blank);
    //给增加的input增加监听事件
    const currentInput = studyRef.current.childNodes[listIndex];
    let diffX;
    let diffY;
    let currentX;
    let currentY;
    //move监听函数
    const moveFn = (e) => {
      //还要减去margin的偏移量
      currentInput.style.left = e.clientX - 20 - diffX + "px";
      currentInput.style.top = e.clientY - diffY + "px";
      console.log(e);
    };
    //添加监听器
    currentInput.addEventListener(
      "mousedown",
      (e) => {
        //按住

        currentInput.style.position = "absolute";

        diffX = e.clientX - currentInput.offsetLeft;
        diffY = e.clientY - currentInput.offsetTop;
        currentX = currentInput.style.left;
        currentY = currentInput.style.top;

        //moving
        currentInput.addEventListener("mousemove", moveFn);
      },
      false
    );

    currentInput.addEventListener("mouseup", () => {
      //松开的逻辑
      // if(){

      // }

      currentInput.style.position = "";
      currentInput.style.left = currentX;
      currentInput.style.top = currentY;

      currentInput.removeEventListener("mousemove", moveFn);
    });
    setlistIndex(listIndex + 2);
  };

  return (
    <TaskWrapper>
      <div className="study" ref={studyRef}>
        <div className="add" ref={addInput} onClick={add}>
          +
        </div>
      </div>
      <div className="learning"></div>
      <div className="complete"></div>
    </TaskWrapper>
  );
});

export default Task;
