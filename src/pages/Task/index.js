import React, { memo, useRef, useState } from "react";
import { TaskWrapper } from "./style";

const Task = memo(() => {
  const [listIndex, setlistIndex] = useState(0);

  const taskRef = useRef();
  const addInput = useRef();
  const studyRef = useRef();
  const learningRef = useRef();
  const completeRef = useRef();

  //添加input框
  const createElement = () => {
    const newInput = document.createElement("input");

    addInput.current.before(newInput);
  };

  const moveElement = (element, value) => {
    const newInput = document.createElement("div");
    const deleteBtn = document.createElement("div");
    //创建删除按钮并添加事件
    deleteBtn.className = "delete";
    deleteBtn.innerHTML = "x";
    deleteBtn.addEventListener("click", btnDelete);

    newInput.className = "input";
    newInput.innerHTML = value;
    newInput.appendChild(deleteBtn);
    element.current.appendChild(newInput);
  };

  const btnDelete = (e) => {
    // console.log(e.path[2].className);
    if (e.path[2].className === "learning") {
      learningRef.current.removeChild(e.path[1]);
    } else if (e.path[2].className === "complete") {
      completeRef.current.removeChild(e.path[1]);
    }
  };

  // 添加新的study
  const add = () => {
    createElement();
    //给增加的input增加监听事件
    const currentInput = studyRef.current.childNodes[listIndex];
    if (listIndex < 0) {
      setlistIndex(0);
    }
    setlistIndex(listIndex + 1);
    let diffX; //与外层的距离（input）
    let diffY;
    let currentX; //input框原始的位置
    let currentY;
    let mouseX; //鼠标的位置
    let mouseY;
    let taskX;
    let taskY;
    //move监听函数
    const moveFn = (e) => {
      //设置拖动时的位置(还要减去margin的偏移量)
      currentInput.style.left = e.clientX - 20 - diffX + "px";
      currentInput.style.top = e.clientY - diffY + "px";
      mouseX = e.clientX;
      mouseY = e.clientY;

      //当鼠标进入学习或完成框中，边框发生变化
      taskX = taskRef.current.offsetLeft;
      taskY = taskRef.current.offsetTop;
      if (
        mouseX > taskX - 100 &&
        mouseX < taskX + 100 &&
        mouseY < taskY + learningRef.current.scrollHeight / 2 &&
        mouseY > taskY - learningRef.current.scrollHeight / 2
      ) {
        // 改变边框
        learningRef.current.style.border = "2px solid #85eaff";
      } else {
        learningRef.current.style.border = "";
      }
      if (
        mouseX > taskX - 100 + learningRef.current.scrollWidth &&
        mouseX < taskX + 100 + learningRef.current.scrollWidth &&
        mouseY < taskY + completeRef.current.scrollHeight / 2 &&
        mouseY > taskY - completeRef.current.scrollHeight / 2
      ) {
        // 改变边框
        completeRef.current.style.border = "2px solid #74787c";
      } else {
        completeRef.current.style.border = "";
      }

      // console.log(taskRef);

      // console.log(mouseX, mouseY);
    };

    //mousedown监听函数
    const mouseDownFn = (e) => {
      //按住

      currentInput.style.position = "absolute";

      diffX = e.clientX - currentInput.offsetLeft;
      diffY = e.clientY - currentInput.offsetTop;
      currentX = currentInput.style.left;
      currentY = currentInput.style.top;

      //moving
      currentInput.addEventListener("mousemove", moveFn);
    };

    //mouseup
    const mouseupFn = (e) => {
      //松开的逻辑
      // console.log(1231, e);
      if (
        mouseX > taskX - 100 &&
        mouseX < taskX + 100 &&
        mouseY < taskY + learningRef.current.scrollHeight / 2 &&
        mouseY > taskY - learningRef.current.scrollHeight / 2
      ) {
        moveElement(learningRef, e.srcElement.value);
        //销毁原来的input,并做相应的操作
        studyRef.current.removeChild(e.srcElement);
        setlistIndex(listIndex - 1);
        learningRef.current.style.border = "";
        // console.log(123, e);
        console.log(1231, e.srcElement.value);
        // console.log(12312, listIndex);
      }
      if (
        mouseX > taskX - 100 + learningRef.current.scrollWidth &&
        mouseX < taskX + 100 + learningRef.current.scrollWidth &&
        mouseY < taskY + completeRef.current.scrollHeight / 2 &&
        mouseY > taskY - completeRef.current.scrollHeight / 2
      ) {
        moveElement(completeRef, e.srcElement.value);
        studyRef.current.removeChild(e.srcElement);
        setlistIndex(listIndex - 1);

        completeRef.current.style.border = "";
      }

      currentInput.style.position = "";
      currentInput.style.left = currentX;
      currentInput.style.top = currentY;

      currentInput.removeEventListener("mousemove", moveFn);
    };

    //兼容bug//没有获取到当前新创建的input时
    if (currentInput) {
      //添加监听器

      currentInput.addEventListener("mousedown", mouseDownFn);
      currentInput.addEventListener("mouseup", mouseupFn);
    } else {
      console.log(231, studyRef);
      studyRef.current.childNodes[0].addEventListener("mousedown", (e) => {
        //按住
        const currentInput = studyRef.current.childNodes[0];
        currentInput.style.position = "absolute";

        diffX = e.clientX - currentInput.offsetLeft;
        diffY = e.clientY - currentInput.offsetTop;
        currentX = currentInput.style.left;
        currentY = currentInput.style.top;

        //moving
        studyRef.current.childNodes[0].addEventListener("mousemove", (e) => {
          const currentInput = studyRef.current.childNodes[0];
          //设置拖动时的位置(还要减去margin的偏移量)
          currentInput.style.left = e.clientX - 20 - diffX + "px";
          currentInput.style.top = e.clientY - diffY + "px";
          mouseX = e.clientX;
          mouseY = e.clientY;

          //当鼠标进入学习或完成框中，边框发生变化
          taskX = taskRef.current.offsetLeft;
          taskY = taskRef.current.offsetTop;
          if (
            mouseX > taskX - 100 &&
            mouseX < taskX + 100 &&
            mouseY < taskY + learningRef.current.scrollHeight / 2 &&
            mouseY > taskY - learningRef.current.scrollHeight / 2
          ) {
            // 改变边框
            learningRef.current.style.border = "2px solid #85eaff";
          } else {
            learningRef.current.style.border = "";
          }
          if (
            mouseX > taskX - 100 + learningRef.current.scrollWidth &&
            mouseX < taskX + 100 + learningRef.current.scrollWidth &&
            mouseY < taskY + completeRef.current.scrollHeight / 2 &&
            mouseY > taskY - completeRef.current.scrollHeight / 2
          ) {
            // 改变边框
            completeRef.current.style.border = "2px solid #74787c";
          } else {
            completeRef.current.style.border = "";
          }

          // console.log(taskRef);

          // console.log(mouseX, mouseY);
        });
      });
      studyRef.current.childNodes[0].addEventListener("mouseup", (e) => {
        //松开的逻辑
        const currentInput = studyRef.current.childNodes[0];
        if (
          mouseX > taskX - 100 &&
          mouseX < taskX + 100 &&
          mouseY < taskY + learningRef.current.scrollHeight / 2 &&
          mouseY > taskY - learningRef.current.scrollHeight / 2
        ) {
          moveElement(learningRef, e.srcElement.value);
          //销毁原来的input,并做相应的操作
          studyRef.current.removeChild(e.srcElement);
          setlistIndex(listIndex - 1);
          learningRef.current.style.border = "";
          // console.log(123, e);
          console.log(1231, e.srcElement.value);
          // console.log(12312, listIndex);
        }
        if (
          mouseX > taskX - 100 + learningRef.current.scrollWidth &&
          mouseX < taskX + 100 + learningRef.current.scrollWidth &&
          mouseY < taskY + completeRef.current.scrollHeight / 2 &&
          mouseY > taskY - completeRef.current.scrollHeight / 2
        ) {
          moveElement(completeRef, e.srcElement.value);
          studyRef.current.removeChild(e.srcElement);
          setlistIndex(listIndex - 1);

          completeRef.current.style.border = "";
        }

        currentInput.style.position = "";
        currentInput.style.left = currentX;
        currentInput.style.top = currentY;

        currentInput.removeEventListener("mousemove", (e) => {
          //设置拖动时的位置(还要减去margin的偏移量)
          currentInput.style.left = e.clientX - 20 - diffX + "px";
          currentInput.style.top = e.clientY - diffY + "px";
          mouseX = e.clientX;
          mouseY = e.clientY;

          //当鼠标进入学习或完成框中，边框发生变化
          taskX = taskRef.current.offsetLeft;
          taskY = taskRef.current.offsetTop;
          if (
            mouseX > taskX - 100 &&
            mouseX < taskX + 100 &&
            mouseY < taskY + learningRef.current.scrollHeight / 2 &&
            mouseY > taskY - learningRef.current.scrollHeight / 2
          ) {
            // 改变边框
            learningRef.current.style.border = "2px solid #85eaff";
          } else {
            learningRef.current.style.border = "";
          }
          if (
            mouseX > taskX - 100 + learningRef.current.scrollWidth &&
            mouseX < taskX + 100 + learningRef.current.scrollWidth &&
            mouseY < taskY + completeRef.current.scrollHeight / 2 &&
            mouseY > taskY - completeRef.current.scrollHeight / 2
          ) {
            // 改变边框
            completeRef.current.style.border = "2px solid #74787c";
          } else {
            completeRef.current.style.border = "";
          }
        });
      });
    }
  };

  return (
    <TaskWrapper ref={taskRef}>
      <div className="study" ref={studyRef}>
        <div className="add" ref={addInput} onClick={add}>
          +
        </div>
      </div>
      <div className="learning" ref={learningRef}></div>
      <div className="complete" ref={completeRef}></div>
    </TaskWrapper>
  );
});

export default Task;
