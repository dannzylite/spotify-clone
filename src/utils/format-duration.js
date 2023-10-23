function getDuration(duration_min) {
    const duration_sec = (duration_min - Math.floor(duration_min)) * 60
    const duration = Math.floor(duration_min) + (Math.floor(duration_sec) / 100)
    return duration.toFixed(2)
}

export default getDuration