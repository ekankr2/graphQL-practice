interface Post {
    title: string
    author: string
    slug: string
    categories: Category[]
    featuredImage: {
        url: string
    }
    createdAt: any
}

interface Category {
    name: string
    slug: string
}