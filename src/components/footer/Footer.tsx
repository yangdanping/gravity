import { memo } from 'react';
import { FooterWrapper } from './style';
import footerData from '@/assets/data/footer.json';
import { dateFormat } from '@/utils/dateFormat';

const Footer = memo(() => {
  return (
    <FooterWrapper>
      <div className="wrapper">
        <div className="service">
          {footerData.map((item) => {
            return (
              <div className="item" key={item.name}>
                <div className="name">{item.name}</div>
                <div className="list">
                  {item.list.map((item) => {
                    return (
                      <div className="item" key={item}>
                        {item}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="statement">© {dateFormat(new Date(), 'YYYY')} yangdanping, Inc. All rights reserved.条款 · 隐私政策 · 网站地图</div>
      </div>
    </FooterWrapper>
  );
});

export default Footer;
