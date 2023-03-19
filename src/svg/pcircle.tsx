export default () => {
  const formatedValue = (value: number) => (value > 100 ? 100 : value < 0 ? 0 : value);

  const perimeter = 60 * 2 * Math.PI;

  return (
    <svg>
      <circle
        r='60'
        cx='60'
        cy='60'
        fill='#FFF'
        stroke='#aaa'
        strokeWidth='8'
        strokeDasharray={`${perimeter * 0.5} 999`}
      />
    </svg>
  );
};
