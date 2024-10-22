import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get('http://localhost:5000/');
                setCourses(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await axios.post('http://localhost:5000/inquire', {name, message})
            alert(`Name: ${res.data.name} Message: ${res.data.message}`)
        } catch (e) {
            console.log("Error in submitting form", e)
        }
    };

    return (
        <div>
            <div className="courses">
                <h1 className="mb-5 p-5" style={{backgroundColor: "light-green"}}>Online Courses</h1>
                <h3 className="mb-5">List of available courses</h3>
                <div className="d-flex mb-5">
                {courses.map((course, index) => (
                    <div className="course mx-4 card p-4" key={index} style={{boxShadow: "1px 1px 10px  grey"}}>
                        <h4><strong>Course Name:</strong> {course.name}</h4>
                        <p><strong>Duration:</strong> {course.duration}</p>
                        <p><strong>Fees:</strong> {course.fees}</p>
                    </div>
                ))}
                </div>
            </div>

            <div className="form">
                <h3 className="mb-4">Inquire About a Course</h3>
                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label htmlFor="name" className="me-3"><h5>Name:</h5></label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="my-3">
                        <label htmlFor="message" className="me-3"><h5>Message:</h5></label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{}}>Submit Inquiry</button>
                </form>
                {submitted && <p>Thank you for your inquiry, {name}!</p>}
            </div>
        </div>
    );
}
