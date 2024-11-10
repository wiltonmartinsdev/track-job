import { useState } from "react";

import JobForm, { Job } from "./components/JobForm";
import JobList from "./components/JobList";

export default function App() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleAddJob = (job: Job) => {
        if (editingIndex !== null) {
            const updatedJobs = jobs.map((j, index) =>
                index === editingIndex ? job : j
            );
            setJobs(updatedJobs);
            setEditingIndex(null);
        } else {
            setJobs([...jobs, job]);
        }
    };

    const handleUpdateStatus = (index: number, status: string) => {
        const updatedJobs = jobs.map((job, i) =>
            i === index ? { ...job, status } : job
        );
        setJobs(updatedJobs);
    };

    const handleEditJob = (index: number) => {
        setEditingIndex(index);
    };

    const handleDeleteJob = (index: number) => {
        const updatedJobs = jobs.filter((_, i) => i !== index);
        setJobs(updatedJobs);
    };

    const editingJob = editingIndex !== null ? jobs[editingIndex] : null;

    return (
        <div>
            <header className="bg-blue-600 text-white text-center p-4">
                <h1 className="text-2xl">Acompanhamento de Candidaturas</h1>
                <p>Total de candidaturas: {jobs.length}</p>
            </header>

            <JobForm
                onAdd={handleAddJob}
                editingJob={editingJob}
            />
            <JobList
                jobs={jobs}
                onUpdateStatus={handleUpdateStatus}
                onEditJob={handleEditJob}
                onDeleteJob={handleDeleteJob}
            />
        </div>
    );
}