import React, { useState } from 'react'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'

const AddTask = ({ handleNewTaskAdded }) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const addTask = async () => {
        if (newTaskTitle.trim()) {
            try {
                await axios.post('http://localhost:5001/api/tasks', {
                    title: newTaskTitle,
                })
                toast.success(`Added task ${newTaskTitle} successfully.`)
                handleNewTaskAdded()
            } catch (error) {
                console.error('Error occurs when add task', error)
                toast.error('Error occurs when add new task')
            }

            setNewTaskTitle('')
        } else {
            toast.error('You need to enter the content of the task.')
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            addTask()
        }
    }

    return (
        <Card className='p-6 border-0 bg-gradient-card shadow-custom-lg'>
            <div className='flex flex-col gap-3 sm:flex-row'>
                <Input
                    type='text'
                    placeholder='What needs to be done?'
                    className='h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20'
                    value={newTaskTitle}
                    onChange={(even) => setNewTaskTitle(even.target.value)}
                    onKeyPress={handleKeyPress}
                />

                <Button
                    variant='gradient'
                    size='xl'
                    className='px-6'
                    onClick={addTask}
                >
                    <Plus className='size-5' />
                    Add
                </Button>
            </div>
        </Card>
    )
}

export default AddTask
