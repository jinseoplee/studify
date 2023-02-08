import { useState } from "react";

import RoungeStyle from "../../Style/StudyRounge/StudyRounge.module.css";
import pythonlogo from "../../assets/image/stack/python.PNG";
import javalogo from "../../assets/image/stack/java.PNG";
import javascriptlogo from "../../assets/image/stack/javascript.PNG";
import cpplogo from "../../assets/image/stack/c++.PNG";
import vuelogo from "../../assets/image/stack/vue.PNG";
import reactlogo from "../../assets/image/stack/react.PNG";
import etclogo from "../../assets/image/stack/etc.PNG";

const StudyRounge = () => {
  const [python, setPython] = useState(false);
  const [java, setJava] = useState(false);
  const [javascript, setJavascript] = useState(false);
  const [cpp, setCpp] = useState(false);
  const [vue, setVue] = useState(false);
  const [react, setReact] = useState(false);
  const [etc, setEtc] = useState(false);

  return (
    <div className={RoungeStyle.RoungeFilterContainer}>
      <button className={RoungeStyle.RoungeFilterBtn}>
        <img src={pythonlogo} />
      </button>
      <button className={RoungeStyle.RoungeFilterBtn}>
        <img src={javalogo} />
      </button>
      <button className={RoungeStyle.RoungeFilterBtn}>
        <img src={javascriptlogo} />
      </button>
      <button className={RoungeStyle.RoungeFilterBtn}>
        <img src={cpplogo} />
      </button>
      <button className={RoungeStyle.RoungeFilterBtn}>
        <img src={vuelogo} />
      </button>
      <button className={RoungeStyle.RoungeFilterBtn}>
        <img src={reactlogo} />
      </button>
      <button className={RoungeStyle.RoungeFilterBtn}>
        <img src={etclogo} />
      </button>
    </div>
  );
};

export default StudyRounge;
