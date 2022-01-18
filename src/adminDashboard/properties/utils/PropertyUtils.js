export const getBadgeClass = (status) => {
    if (status === 'Inspected') {
        return 'brightGreen badge'
    } else if (status === 'New') {
        return 'pink badge'
    } else if (status === 'Ready For Install') {
        return 'purple badge'
    } else if (status === 'operational') {
        return 'blue badge'
    } else {
        return 'yellow badge'
    }
}

export const getBadgeText = (status) => {
    if (status === 'inspected') {
        return 'inspected'
    } else if (status === 'new') {
        return 'New'
    } else if (status === 'ready-or-nstall') {
        return 'Ready For Install'
    } else if (status === 'operational') {
        return 'Opertational'
    } else {
        return 'Pre-Config'
    }
}

export const getDashboardBadgeClass = (status) => {
    if (status === 'Inspected') {
        return 'brightGreen dash-badge'
    } else if (status === 'New') {
        return 'pink dash-badge'
    } else if (status === 'Ready For Install') {
        return 'purple dash-badge'
    } else if (status === 'operational') {
        return 'blue dash-badge'
    } else {
        return 'yellow dash-badge'
    }
}

export const getTypesOfPowerServiceOptions = () => {
    return [
        { label: '1P-240', value: '1P-240' },
        { label: '3P-208', value: '3P-208' },
    ]
}    

export const getAllStates = () => {
    return [
        {
            name: 'Alabama',
            abbreviation: 'AL',
        },
        {
            name: 'Alaska',
            abbreviation: 'AK',
        },
        {
            name: 'American Samoa',
            abbreviation: 'AS',
        },
        {
            name: 'Arizona',
            abbreviation: 'AZ',
        },
        {
            name: 'Arkansas',
            abbreviation: 'AR',
        },
        {
            name: 'California',
            abbreviation: 'CA',
        },
        {
            name: 'Colorado',
            abbreviation: 'CO',
        },
        {
            name: 'Connecticut',
            abbreviation: 'CT',
        },
        {
            name: 'Delaware',
            abbreviation: 'DE',
        },
        {
            name: 'District Of Columbia',
            abbreviation: 'DC',
        },
        {
            name: 'Federated States Of Micronesia',
            abbreviation: 'FM',
        },
        {
            name: 'Florida',
            abbreviation: 'FL',
        },
        {
            name: 'Georgia',
            abbreviation: 'GA',
        },
        {
            name: 'Guam',
            abbreviation: 'GU',
        },
        {
            name: 'Hawaii',
            abbreviation: 'HI',
        },
        {
            name: 'Idaho',
            abbreviation: 'ID',
        },
        {
            name: 'Illinois',
            abbreviation: 'IL',
        },
        {
            name: 'Indiana',
            abbreviation: 'IN',
        },
        {
            name: 'Iowa',
            abbreviation: 'IA',
        },
        {
            name: 'Kansas',
            abbreviation: 'KS',
        },
        {
            name: 'Kentucky',
            abbreviation: 'KY',
        },
        {
            name: 'Louisiana',
            abbreviation: 'LA',
        },
        {
            name: 'Maine',
            abbreviation: 'ME',
        },
        {
            name: 'Marshall Islands',
            abbreviation: 'MH',
        },
        {
            name: 'Maryland',
            abbreviation: 'MD',
        },
        {
            name: 'Massachusetts',
            abbreviation: 'MA',
        },
        {
            name: 'Michigan',
            abbreviation: 'MI',
        },
        {
            name: 'Minnesota',
            abbreviation: 'MN',
        },
        {
            name: 'Mississippi',
            abbreviation: 'MS',
        },
        {
            name: 'Missouri',
            abbreviation: 'MO',
        },
        {
            name: 'Montana',
            abbreviation: 'MT',
        },
        {
            name: 'Nebraska',
            abbreviation: 'NE',
        },
        {
            name: 'Nevada',
            abbreviation: 'NV',
        },
        {
            name: 'New Hampshire',
            abbreviation: 'NH',
        },
        {
            name: 'New Jersey',
            abbreviation: 'NJ',
        },
        {
            name: 'New Mexico',
            abbreviation: 'NM',
        },
        {
            name: 'New York',
            abbreviation: 'NY',
        },
        {
            name: 'North Carolina',
            abbreviation: 'NC',
        },
        {
            name: 'North Dakota',
            abbreviation: 'ND',
        },
        {
            name: 'Northern Mariana Islands',
            abbreviation: 'MP',
        },
        {
            name: 'Ohio',
            abbreviation: 'OH',
        },
        {
            name: 'Oklahoma',
            abbreviation: 'OK',
        },
        {
            name: 'Oregon',
            abbreviation: 'OR',
        },
        {
            name: 'Palau',
            abbreviation: 'PW',
        },
        {
            name: 'Pennsylvania',
            abbreviation: 'PA',
        },
        {
            name: 'Puerto Rico',
            abbreviation: 'PR',
        },
        {
            name: 'Rhode Island',
            abbreviation: 'RI',
        },
        {
            name: 'South Carolina',
            abbreviation: 'SC',
        },
        {
            name: 'South Dakota',
            abbreviation: 'SD',
        },
        {
            name: 'Tennessee',
            abbreviation: 'TN',
        },
        {
            name: 'Texas',
            abbreviation: 'TX',
        },
        {
            name: 'Utah',
            abbreviation: 'UT',
        },
        {
            name: 'Vermont',
            abbreviation: 'VT',
        },
        {
            name: 'Virgin Islands',
            abbreviation: 'VI',
        },
        {
            name: 'Virginia',
            abbreviation: 'VA',
        },
        {
            name: 'Washington',
            abbreviation: 'WA',
        },
        {
            name: 'West Virginia',
            abbreviation: 'WV',
        },
        {
            name: 'Wisconsin',
            abbreviation: 'WI',
        },
        {
            name: 'Wyoming',
            abbreviation: 'WY',
        },
    ]
}
