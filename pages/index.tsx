import type { NextPage } from 'next'
import CalendarHeader from '../components/CalendarHeader'
import CalendarCell from '@components/CalendarCell'

const Home: NextPage = () => {
  const date = new Date()
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  return (
    <div>
      <h1 className='text-center font-bold'>{date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h1>
      <table className='w-full table-fixed'>
      <thead>
        <tr>
          {
            weekDays.map((day) => {
              return <CalendarHeader text={day} />
            })
          }
        </tr>
      </thead>
      <tbody>
        <tr>
          <CalendarCell date={3} events={[{
            date: new Date(),
            email: "blabla@gmail.com",
            eventName: "yes sir"
          }]}/>
        </tr>
      </tbody>
    </table>
    </div>
  )
}

export default Home
