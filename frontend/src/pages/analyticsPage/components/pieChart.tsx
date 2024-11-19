import { PieChart } from '@mui/x-charts/PieChart';
import "./components.css";

export default function ClassTimeProportions() {
  return (
    <div className='chart'>
    <PieChart
    margin={{ top: 70, bottom: 10, left: 100, right:100 }}
      series={[
        {
          data: [
            { id: 0, value: 12, color: "blue",label: 'Human-Computer Interaction' },
            { id: 2, value: 20, color: "teal", label: 'Business Analytics' },
            { id: 1, value: 15, color: "light blue", label: 'Introduction to Business at Northeastern' },
            { id: 3, value: 20, color: "navy", label: 'Introduction to Data Science' },
          ]},
      ]}
      slotProps={{
        legend: {
          direction: 'row',
          position: { vertical: 'top', horizontal: 'middle' },
          padding: 0,
        },
      }}
      width={700}
      height={500}
    />
    </div>
  );
}