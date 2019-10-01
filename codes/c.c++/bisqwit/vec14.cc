template<unsigned dim>
struct vec
{
    float d[dim];

    template<typename ...T>
    vec(T&&... args) : d{ args... } {}

    float operator[] (unsigned n) const { return d[n]; }

    auto CrossProduct(const vec& b) const;
};

static inline float CrossProduct(const vec<2>& a, const vec<2>& b)
{
    return a[0]*b[1] - a[1]*b[0];
}
static inline vec<3> CrossProduct(const vec<3>& a, const vec<3>& b)
{
    return vec<3>{ a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0] };
}

template<unsigned dim>
auto vec<dim>::CrossProduct(const vec<dim>& b) const
{
    return ::CrossProduct(*this, b);
}

int main()
{
    vec<2> a{1.f, 2.f},      b{3.f, 4.f};
    vec<3> c{5.f, 6.f, 7.f}, d{8.f, 9.f, 10.f};

    float  res1 = a.CrossProduct(b);
    vec<3> res2 = c.CrossProduct(d);
}
