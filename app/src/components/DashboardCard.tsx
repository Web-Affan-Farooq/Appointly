const Card = ({
  dataKey,
  value,
}: {
  dataKey: string;
  value: number | string | boolean;
}) => {
  return (
    <div className="bg-pink text-black rounded-2xl w-[160px] h-[80px] px-4 py-2 max-sm:w-[130px] max-sm:h-[65px]">
      <span className="text-sm">{dataKey}</span>
      <p className="text-3xl font-bold max-sm:text-xl">{value}</p>
    </div>
  );
};

const data = [
  {
    key: "Completed",
    value: 4,
  },
  {
    key: "Cancelled",
    value: 4,
  },
];
const DashboardCard = () => {
  return (
    <div className="flex flex-row flex-nowrap gap-[10px]">
      <div className="flex flex-row flex-wrap gap-5 px-7 pb-5">
        {data.map((val, idx) => (
          <Card dataKey={val.key} value={val.value} key={idx} />
        ))}
      </div>
    </div>
  );
};
export default DashboardCard;
