// 主题样式-----------------------------------------------------------
export const theme = {
  item: {
    padding: '8px',
  },
  img: {
    primaryColor: 'skyblue',
    secondaryColor: '#23d18b',
    // primaryColor: '#ff385c',
    // secondaryColor: '#00848A',
  },
  text: {
    primaryColor: '#484848',
    secondaryColor: '#222',
  },
};

// flex布局-----------------------------------------------------------
export const flexCenter = `
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const flexRight = `
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
export const flexLeft = `
  display: flex;
  align-items: center;
`;
export const flexColumn = `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// boxShadow-----------------------------------------------------------
export const boxShadowAnimation = `
transition: box-shadow 200ms ease;
&:hover {
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}
`;
export const boxShadow = `box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.1);`;
export const boxShadowSM = `box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05), 0 2px 8px hsla(0, 0%, 0%, 0.05)`;
export const boxShadowMD = `box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.06), 0 2px 6px hsla(0, 0%, 0%, 0.06), 0 3px 8px hsla(0, 0%, 0%, 0.09)`;
export const boxShadowLG = `box-shadow: 0 1px 4px hsla(0, 0%, 0%, 0.09), 0 3px 8px hsla(0, 0%, 0%, 0.09), 0 4px 13px hsla(0, 0%, 0%, 0.13)`;
export const boxShadowXL = `box-shadow: 0 10px 24px hsla(0, 0%, 0%, 0.05), 0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1)`;
