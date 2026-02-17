import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  TrendingUp,
  Calendar,
  Download,
  LogOut,
  Filter,
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [analytics, setAnalytics] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    campaign: "",
    source: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [analyticsRes, leadsRes] = await Promise.all([
        api.getAnalytics(filters),
        api.getLeads({ ...filters, limit: 100 }),
      ]);

      if (analyticsRes.success) {
        setAnalytics(analyticsRes.data);
      }

      if (leadsRes.success) {
        setLeads(leadsRes.data?.leads || []);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    api.logout();
    navigate("/admin/login");
  };

  const handleExport = async () => {
    try {
      await api.exportLeadsCSV(filters);
      toast({
        title: "Success",
        description: "Leads exported successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export leads",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <div className="bg-background border-b border-border">
        <div className="container-max py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">
            Reinsure Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      <div className="container-max py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Leads</p>
                <p className="text-3xl font-bold text-foreground">
                  {analytics?.summary?.totalLeads || 0}
                </p>
              </div>
              <Users className="w-12 h-12 text-accent opacity-20" />
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Leads Today</p>
                <p className="text-3xl font-bold text-foreground">
                  {analytics?.summary?.leadsToday || 0}
                </p>
              </div>
              <TrendingUp className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">This Month</p>
                <p className="text-3xl font-bold text-foreground">
                  {analytics?.summary?.leadsThisMonth || 0}
                </p>
              </div>
              <Calendar className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              className="px-4 py-2 rounded-lg border border-border bg-background text-foreground"
              placeholder="Start Date"
            />
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              className="px-4 py-2 rounded-lg border border-border bg-background text-foreground"
              placeholder="End Date"
            />
            <button
              onClick={fetchData}
              className="btn-accent"
            >
              Apply Filters
            </button>
            <button
              onClick={handleExport}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border bg-background text-foreground hover:bg-accent/10 transition"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Leads Chart */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Leads Per Day (Last 30 Days)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics?.dailyLeads || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8b5cf6" name="Leads" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Campaign Performance */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Campaign Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics?.leadsByCampaign?.slice(0, 5) || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="campaign" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8b5cf6" name="Leads" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Source Breakdown */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Lead Sources
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics?.leadsBySource || []}
                  dataKey="count"
                  nameKey="source"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {(analytics?.leadsBySource || []).map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Service Breakdown */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Leads by Service
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics?.leadsByService || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="service" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#10b981" name="Leads" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Leads Table */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Recent Leads
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Phone</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Service</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Source</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Campaign</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {leads.slice(0, 20).map((lead: any) => (
                  <tr key={lead._id} className="border-b border-border hover:bg-accent/5">
                    <td className="py-3 px-4 text-sm text-foreground">{lead.name}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{lead.email}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{lead.phone}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{lead.service || '-'}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{lead.utm_source || '-'}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{lead.utm_campaign || '-'}</td>
                    <td className="py-3 px-4 text-sm text-foreground">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
