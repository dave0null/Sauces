template<unsigned dim>
struct vec
{
    float d[dim];

    template<typename ...T>
    vec(T&&... args) : d{ args... } {}

    float operator[] (unsigned n) const { return d[n]; }

    auto CrossProduct(const vec& b) const
    {
        if constexpr (dim==2)
        {
            return d[0]*b[1] - d[1]*b[0];
        }
        if constexpr (dim==3)
        {
            return vec<3>{ d[1]*b[2]-d[2]*b[1], d[2]*b[0]-d[0]*b[2], d[0]*b[1]-d[1]*b[0] };
        }
    }
};

int main()
{
    vec<2> a{1.f, 2.f},      b{3.f, 4.f};
    vec<3> c{5.f, 6.f, 7.f}, d{8.f, 9.f, 10.f};

    float  res1 = a.CrossProduct(b);
    vec<3> res2 = c.CrossProduct(d);
}
