import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <Row>
          <Col style={{ width: "100%", textAlign: "center" }}>
            <h1>House management system</h1>
            <h3>Система обліку житлових будинків</h3>
          </Col>
        </Row>
        <Row>
          <Col style={{ display: "flex", justifyContent: "center" }}>
            <div class="row">
              <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
                <img
                  src="https://api.kramatorskpost.com/storage/article-images/wp-content/55049/pustyr-655x430.jpg"
                  class="w-100 shadow-1-strong rounded mb-4"
                  alt=""
                />

                <img
                  src="https://eimg.pravda.com/images/doc/e/c/ec38c63--.jpg"
                  class="w-100 shadow-1-strong rounded mb-4"
                  alt=""
                />
              </div>

              <div class="col-lg-4 mb-4 mb-lg-0">
                <img
                  src="https://img.tsn.ua/cached/1533904664/tsn-c4a14e908bc0d57dbb04383f58c6fbeb/thumbs/1340x530/99/c9/8f768b1dd0c6fa6e743626148824c999.jpeg"
                  class="w-100 shadow-1-strong rounded mb-4"
                  alt=""
                />
                <img
                  src="https://cdn.riastatic.com/photos/dom/newbuild_photo/15/1539/153922/153922fl.jpg"
                  class="w-100 shadow-1-strong rounded mb-4"
                  alt=""
                />

              </div>

              <div class="col-lg-4 mb-4 mb-lg-0">
                <img
                  src="https://chgtrk.ru/nimg/2021/04/05/x6F5C9946-4A10-4602-83F2-A0F8C668E6DA.jpg.pagespeed.ic.ZcB_jmtjA5.jpg"
                  class="w-100 shadow-1-strong rounded mb-4"
                  alt=""
                />

                <img
                  src="https://n1s1.hsmedia.ru/86/0e/08/860e08eedef8f548f82aac07db252dce/620x413_1_d4ce5209554f71ef61ecbef3434b0c6c@3000x2000_0xac120003_9850581941557284755.jpg"
                  class="w-100 shadow-1-strong rounded mb-4"
                  alt=""
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 style={{ width: "100%", textAlign: "center" }} className="my-1">Опис</h2>
            <p>
              &emsp;&emsp;Система обліку житлових будинків розроблена як допоміжний інструмент для домоуправиталів.
              За допомогою системи можна виконувати операції над записами про будинки, постачальників
              послуг та послуги, що вони надають, мешканців будників і їхніми квартплатами як основного
              джерела доходів та витратами будинків на зареєстровані в системі послуги.
          </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 style={{ width: "100%", textAlign: "center" }} className="my-1">Довідка</h2>
            <p>

            </p>
          </Col>
        </Row>
      </div>
    );
  }
}
