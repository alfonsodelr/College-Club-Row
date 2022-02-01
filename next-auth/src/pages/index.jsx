import React from 'react';
import $ from "./index.module.scss"
import Header from "../components/layouts/header"
function index() {
  return <div>
    <Header />
    <h1 style={{ textAlign: 'center' }}>Flex exercise</h1>
    <div className={$.container}>
      <div className={`${$.item} ${$.item1}`}>
        <p>Hello from item</p>
      </div>
      <div className={`${$.item} ${$.item2}`}>
        <p>Hello from item</p>
      </div>
      <div className={`${$.item} ${$.item3}`}>
        <p>Hello from item</p>
      </div>
      <div className={`${$.item} ${$.item4}`}>
        <p>Hello from item</p>
      </div>
      <div className={`${$.item} ${$.item5}`}>
        <p>Hello from item</p>
      </div>
      <div className={`${$.item} ${$.item6}`}>
        <p>Hello from item</p>
      </div>
      <div className={`${$.item} ${$.item7}`}>
        <p>Hello from item</p>
      </div>
      <div className={`${$.item} ${$.item8}`}>
        <p>Hello from item</p>
      </div>
      <div className={`${$.item} ${$.item9}`}>
        <p>Hello from item</p>
      </div>
      <div className={`${$.item} ${$.item10}`}>
        <p>Hello from item10</p>
      </div>
      <div className={`${$.item} ${$.item11}`}>
        <p>Hello from item11</p>
      </div>


    </div>
  </div>;
}

export default index;
