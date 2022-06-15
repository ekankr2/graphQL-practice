interface Post {
    title: string
    author: string
    slug: string
    catagories: Category[]
    featuredImage: {
        url: string
    }
    createdAt: any
}

interface Category {
    name: string
    slug: string
}