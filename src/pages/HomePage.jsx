import React, { useEffect, useState } from 'react'
import AddTask from '@/components/AddTask'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import StatsAndFilters from '@/components/StatsAndFilters'
import TaskList from '@/components/TaskList'
import TaskListPagination from '@/components/TaskListPagination'
import { toast } from 'sonner'
import axios from 'axios'

const HomePage = () => {
    const [taskBuffer, setTaskBuffer] = useState([])
    const [activeTaskCount, setActiveTaskCount] = useState(0)
    const [completedTaskCount, setCompletedTaskCount] = useState(0)
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        fetchTasks()
    }, [])

    const fetchTasks = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/tasks')
            setTaskBuffer(res.data.tasks)
            setActiveTaskCount(res.data.activeCount)
            setCompletedTaskCount(res.data.completedCount)
        } catch (error) {
            console.error('Error occurs when access tasks:', error)
            toast.error('Error occurs when access tasks.')
        }
    }

    const handleTaskChanged = () => {
        fetchTasks()
    }

    const filteredTasks = taskBuffer.filter((task) => {
        switch (filter) {
            case 'active':
                return task.status === 'active'
            case 'completed':
                return task.status === 'completed'
            default:
                return true
        }
    })

    return (
        <div className='min-h-screen w-full bg-white relative'>
            {/* Magenta Orb Grid Background */}
            <div
                className='absolute inset-0 z-0'
                style={{
                    background: 'white',
                    backgroundImage: `
     linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
     linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
     radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
   `,
                    backgroundSize: '40px 40px, 40px 40px, 100% 100%',
                }}
            />
            {/* Your Content/Components */}
            <div className='container pt-8 mx-auto relative z-10'>
                <div className='w-full max-w-2xl p-6 mx-auto space-y-6'>
                    {/* Header */}
                    <Header />

                    {/* Create Task */}
                    <AddTask handleNewTaskAdded={handleTaskChanged} />

                    {/* Stats and Filters */}
                    <StatsAndFilters
                        filter={filter}
                        setFilter={setFilter}
                        activeTasksCount={activeTaskCount}
                        completedTaskCount={completedTaskCount}
                    />

                    {/* Task List */}
                    <TaskList filteredTasks={filteredTasks} filter={filter} />

                    {/* Pagination and Filter by Date */}
                    <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
                        <TaskListPagination />
                        <DateTimeFilter />
                    </div>

                    {/* Footer */}
                    <Footer
                        activeTasksCount={activeTaskCount}
                        completedTaskCount={completedTaskCount}
                    />
                </div>
            </div>
        </div>
    )
}

export default HomePage
