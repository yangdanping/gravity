import { memo } from 'react';
import { HeaderWrapper } from './style';
// import c from 'classnames';

// 让左右组件flex为1,这样剩余部分就永远在中间了
const Header = memo(() => {
  return <HeaderWrapper className="sticky">Header组件</HeaderWrapper>;
});

export default Header;
