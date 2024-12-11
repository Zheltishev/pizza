import { Box } from "@mui/material";
import { IOrder } from "../../../tsModals/tsModals";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from "react";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function OrderChart({allOrders} : {allOrders: IOrder[]}) {
    const [dateList, setDateList] = useState<String[]>([])
    const [orderCount, setOrderCount] = useState<Number[]>([])

    useEffect(() => {
        const allDates = allOrders.map((e: IOrder) => e.order_date.slice(0, -9))
        const uniqueDates = Array.from(new Set(allDates))
        const sortedDate = uniqueDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
        const orderByDate = sortedDate.map(e => allOrders.reduce((a, b) => b.order_date.includes(e) ? a + 1 : a + 0, 0))

        setOrderCount(orderByDate)
        setDateList(sortedDate)
    }, [allOrders])

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
        },
      };
      
      const labels = dateList;
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Заказы',
            data: orderCount,
            backgroundColor: '#ffa000',
          },
        ],
      };

    return (
        <Box sx={{ padding: '1rem' }}>
            <Bar options={options} data={data} />
        </Box>
    )
}