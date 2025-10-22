import React from 'react'
import { ComicText } from './ui/comic-text'

const Header = () => {
    return (
        <div className='space-y-2 text-center'>
            <div className='-mt-1'>
                <ComicText
                    fontSize={2.5}
                    backgroundColor='var(--color-violet-500)'
                    dotColor='white'
                >
                    TodoX
                </ComicText>
            </div>

            <p className='text-muted-foreground'>
                Master your workload with clarity, focus, and seamless
                organization daily🏋🏿
            </p>
        </div>
    )
}

export default Header
