import styled from 'styled-components';
import * as style from '@/assets/css/styles';

export const HeaderWrapper = styled.div`
  background: #fff;
  &.sticky {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
  }

  ${style.flexCenter}
  height: var(--navbarHeight);
  border-bottom: 1px solid #eee;
  ${style.boxShadowSM}
`;
