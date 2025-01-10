tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                'gorditas': ['Gorditas', 'cursive'],
                'baloo': ['Baloo 2', 'cursive'],
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.5s ease-out forwards'
            },
            keyframes: {
                fadeInUp: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(20px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                }
            }
        }
    }
}