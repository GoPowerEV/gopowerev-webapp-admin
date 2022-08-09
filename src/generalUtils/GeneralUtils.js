export const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

export const getConsumerStatusClass = (status) => {
    if (status === 'Accepted') {
        return 'accepted status'
    } else if (status === 'Requested') {
        return 'pending status'
    } else {
        return 'pending status'
    }
}

export const getConsumerStatusWording = (status) => {
    if (status === 'Accepted') {
        return 'Active'
    } else if (status === 'Requested') {
        return 'Pending'
    } else {
        return 'No status'
    }
}
