import { Circle } from 'lucide-react'
import React from 'react'
import { Card } from './ui/card'

const TaskEmptyState = ({ filter }) => {
    return (
        <Card className='p-8 text-center border-0 bg-gradient-card shadow-custom-md'>
            <div className='space-y-3'>
                <Circle className='mx-auto size-12 text-muted-foreground' />
                <div>
                    <h3 className='font-medium text-foreground'>
                        {filter === 'active'
                            ? 'No tasks in progress.'
                            : filter === 'completed'
                            ? 'No tasks are finished yet.'
                            : 'There are no tasks yet.'}
                    </h3>

                    <p className='text-sm text-muted-foreground'>
                        {filter === 'all'
                            ? 'Add the first task to start!'
                            : `Switch to 'all' to view all tasks ${
                                  filter === 'active'
                                      ? 'completed.'
                                      : 'in progress.'
                              }`}
                    </p>
                </div>
            </div>
        </Card>
    )
}

export default TaskEmptyState
