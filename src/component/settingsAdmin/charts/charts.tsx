import { Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import { useEffect, useState } from "react";
import ChartsService from "../../../services/ChartsService";
Chart.register(...registerables);

const Charts = () => {
    
     
    const[countCourse, setCountCourse]= useState({ created: 0, modified: 0 });
    const[countQuiz, setCountQuiz]= useState({ created: 0, modified: 0 });


    const refreshList = () => {
        ChartsService.getCountCourse().then((res) => {
            console.log("Corsi: "+ res.data);  
            const [created, modified] = res.data; 
            setCountCourse({ created, modified });         
        })

        ChartsService.getCountQuiz().then((res) => {
            console.log("Quiz: "+ res.data);      
            const [created, modified] = res.data; 
            setCountQuiz({ created, modified });     
        })
    };

    useEffect(() => {
        refreshList();
    }, []);

    return (

        <div style={{ overflowX: "auto" }}>
            <h3 className="display-4 text-danger text-center">Audit Results</h3>
            <Bar
                data={{
                    labels: ["COURSE", "QUIZ"],
                    datasets: [
                        {
                            label: "Created",
                            data: [countCourse.created, countQuiz.created],
                        },
                        {
                            label: "Modified",
                            data: [countCourse.modified, countQuiz.modified],
                        }
                    ]
                }}

            />

        </div>
    );
};

export default Charts;