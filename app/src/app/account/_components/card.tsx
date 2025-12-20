interface Data {
  id: string;
  title: string;
  date: string;
  time: string;
  status: string;
}

interface Props {
  data: Data;
}

export default function AppointmentCard({ data }: Props) {
  return (
    <div className="p-4 shadow-sm shadow-gray-500 rounded-xl flex justify-between items-center">
      <div>
        <h3 className="font-medium text-lg">{data.title}</h3>
        <p className="text-gray-400 text-sm mt-1">
          {data.date} — {data.time}
        </p>
        <p className="text-xs mt-2 text-blue-400 capitalize">{data.status}</p>
      </div>

      <div className="flex flex-col gap-2">
        {data.status === "upcoming" && (
          <button
            className="px-3 py-1 bg-pink text-black rounded-md text-sm"
          >
            Reschedule
          </button>
        )}

        <button className="px-3 py-1 bg-pink text-red-600 rounded-md text-sm">
          Cancel
        </button>
      </div>
    </div>
  );
}
