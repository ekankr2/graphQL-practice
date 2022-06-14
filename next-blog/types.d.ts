interface Post {
    title: string
    slug: string
    featuredImage: {
        url: string
    }
    createdAt: any
}

interface Category {
    name: string
    slug: string
}