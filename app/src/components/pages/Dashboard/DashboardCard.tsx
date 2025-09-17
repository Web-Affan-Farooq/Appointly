"use client";

import useDashboardAnalytics from "./useDashboardAnalytics";

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

const DashboardCard = () => {
  const { completedAppointments, totalAppointments } = useDashboardAnalytics();

  console.log(useDashboardAnalytics());

  return (
    <div className="flex flex-row flex-nowrap gap-[10px]">
      <div className="flex flex-row flex-wrap gap-5 px-7 pb-5">
        <Card
          dataKey={"Total appointments"}
          value={totalAppointments?.length}
        />
        <Card dataKey={"Completed"} value={completedAppointments.length} />
      </div>
    </div>
  );
};
export default DashboardCard;
