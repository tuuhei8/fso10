import Text from "./Text";

const Statistic = ({ number, type }) => {
  if (number >= 1000) {
    const roundedNumber = Math.round(number * 0.01) / 10;
    return (
      <>
        <Text>{roundedNumber}k</Text>
        <Text>{type}</Text>
      </>
    );
  };

  return (
    <>
      <Text>{number}</Text>
      <Text>{type}</Text>
    </>
  );
};

export default Statistic;