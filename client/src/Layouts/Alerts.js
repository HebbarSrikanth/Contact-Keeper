import React, { useContext } from 'react'
import AlertContext from '../context/alert/alertContext'

const Alerts = () => {
    const alertContext = useContext(AlertContext)

    const { alerts } = alertContext

    return (
        alerts.length > 0 &&
        alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.text}`}>
                {alert.message}
            </div>
        ))
    )
}

export default Alerts
