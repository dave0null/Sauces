#include <cstdarg>

template<unsigned dim> struct vec;
template<unsigned dim> struct vec_cross_returntype { };
template<> struct vec_cross_returntype<2> { typedef  float type; };
template<> struct vec_cross_returntype<3> { typedef vec<3> type; };

template<unsigned dim>
struct vec
{
    float d[dim];

    vec()                        { }
    vec(float a,float b)         { d[0]=a; d[1]=b; }
    vec(float a,float b,float c) { d[0]=a; d[1]=b; d[2]=c; }
    vec(float a,float b,float c,float d,float e,float f,float g,float h) { /*TODO*/ }
    vec(float a...)
    {
        unsigned p = 0;
        va_list ap;
        va_start(ap, a);
        for(d[p] = a; ++p < dim; d[p] = va_arg(ap, double)) {}
        va_end(ap);
    }

    float operator[] (unsigned n) const { return d[n]; }

    typename vec_cross_returntype<dim>::type CrossProduct(const vec& b) const;
};
static inline float CrossProduct(const vec<2>& a, const vec<2>& b)
{
    return a[0]*b[1] - a[1]*b[0];
}
static inline vec<3> CrossProduct(const vec<3>& a, const vec<3>& b)
{
    return vec<3>( a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0] );
}

template<unsigned dim>
typename vec_cross_returntype<dim>::type vec<dim>::CrossProduct(const vec<dim>& b) const
{
    return ::CrossProduct(*this, b);
}

int main()
{
    vec<2> xy1(1.f, 2.f),       xy2(3.f, 4.f);
    vec<3> xyz1(5.f, 6.f, 7.f), xyz2(8.f, 9.f, 10.f);

    float  res1 = xy1.CrossProduct(xy2);
    vec<3> res2 = xyz1.CrossProduct(xyz2);
}



