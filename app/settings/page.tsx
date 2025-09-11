"use client"

import { motion } from "framer-motion"
import { PageLayout } from "@/components/PageLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Bell, Shield, Database, Monitor } from "lucide-react"

export default function SettingsPage() {
  return (
    <PageLayout title="System Settings" subtitle="Configure Traffic Control System">
      <div className="container mx-auto px-4 py-4 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* General Settings */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  General Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300">System Name</Label>
                  <Input
                    defaultValue="Indian Railways Traffic Control"
                    className="bg-white/10 border-white/20 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Refresh Interval (seconds)</Label>
                  <Select defaultValue="30">
                    <SelectTrigger className="bg-white/10 border-white/20 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">1 minute</SelectItem>
                      <SelectItem value="300">5 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">Auto-refresh enabled</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">Dark mode</Label>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">Train delay alerts</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">Section congestion alerts</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">Emergency notifications</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">Sound notifications</Label>
                  <Switch />
                </div>
                <div>
                  <Label className="text-gray-300">Alert threshold (minutes)</Label>
                  <Input type="number" defaultValue="15" className="bg-white/10 border-white/20 text-white mt-1" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">Two-factor authentication</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">Session timeout</Label>
                  <Select defaultValue="60">
                    <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 min</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                      <SelectItem value="480">8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">Audit logging</Label>
                  <Switch defaultChecked />
                </div>
                <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
                  Change Password
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Monitor className="w-5 h-5" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Database Connection</span>
                  <span className="text-green-400 text-sm">Connected</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">AI Optimizer</span>
                  <span className="text-green-400 text-sm">Running</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Network Monitor</span>
                  <span className="text-green-400 text-sm">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Last Update</span>
                  <span className="text-gray-400 text-sm">2 min ago</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800">
                  <Database className="w-4 h-4 mr-2" />
                  Export System Logs
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  )
}
