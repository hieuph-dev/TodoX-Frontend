import React, { useEffect, useState } from 'react'
import AddTask from '@/components/AddTask'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import StatsAndFilters from '@/components/StatsAndFilters'
import TaskList from '@/components/TaskList'
import TaskListPagination from '@/components/TaskListPagination'
import { toast } from 'sonner'
import api from '@/lib/axios'
import { visibleTaskLimit } from '@/lib/data'

const HomePage = () => {
    const [taskBuffer, setTaskBuffer] = useState([])
    const [activeTaskCount, setActiveTaskCount] = useState(0)
    const [completedTaskCount, setCompletedTaskCount] = useState(0)
    const [filter, setFilter] = useState('all')
    const [dateQuery, setDateQuery] = useState('today')
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetchTasks()
    }, [dateQuery])

    useEffect(() => {
        setPage(1)
    }, [filter, dateQuery])

    const fetchTasks = async () => {
        try {
            const res = await api.get(`/tasks?filter=${dateQuery}`)
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

    const handleNext = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1)
        }
    }

    const handlePrev = () => {
        if (page > 1) {
            setPage((prev) => prev - 1)
        }
    }

    const handlePageChange = (newPage) => {
        setPage(newPage)
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

    const visibleTasks = filteredTasks.slice(
        (page - 1) * visibleTaskLimit,
        page * visibleTaskLimit
    )

    if (visibleTasks.length === 0) {
        handlePrev()
    }

    const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit)

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
                    <TaskList
                        filteredTasks={visibleTasks}
                        filter={filter}
                        handleTaskChanged={handleTaskChanged}
                    />

                    {/* Pagination and Filter by Date */}
                    <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
                        <TaskListPagination
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                            handlePageChange={handlePageChange}
                            page={page}
                            totalPages={totalPages}
                        />

                        <DateTimeFilter
                            dateQuery={dateQuery}
                            setDateQuery={setDateQuery}
                        />
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
