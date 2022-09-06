export const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

export const getConsumerStatusClass = (status) => {
    if (status === 'Accepted') {
        return 'consumer-tab-action-button accepted status'
    } else if (status === 'Requested') {
        return 'consumer-tab-action-button pending status'
    } else if (!status) {
        return 'consumer-tab-action-button red status'
    } else {
        return 'consumer-tab-action-button pending status'
    }
}

export const getConsumerStatusWording = (status) => {
    if (status === 'Accepted') {
        return 'Active'
    } else if (status === 'Requested') {
        return 'Pending'
    } else {
        return 'None'
    }
}
