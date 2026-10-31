import AppKit

// Run on macOS: swift scripts/generate-social.swift public/images
let directory = CommandLine.arguments[1]
let products: [(String, String, String, String, UInt32)] = [
    ("devpocket", "DevPocket", "一个小工具，", "少一点打断。", 0x13785e),
    ("macclean", "MacClean", "开发缓存，", "看清再清理。", 0x5c63b5),
    ("languageswitcher", "LanguageSwitcher", "换一种语言，", "打开熟悉的应用。", 0x4365b7),
    ("quietlock", "QuietLock", "什么时候息屏，", "你说了算。", 0x147a78),
    ("procscope", "ProcScope", "谁在运行，", "一眼看清。", 0x16766c)
]
func color(_ hex: UInt32) -> NSColor {
    NSColor(srgbRed: Double((hex >> 16) & 255) / 255, green: Double((hex >> 8) & 255) / 255, blue: Double(hex & 255) / 255, alpha: 1)
}
for (slug, name, first, second, accent) in products where CommandLine.arguments.count < 3 || CommandLine.arguments[2] == slug {
    let image = NSImage(size: NSSize(width: 1200, height: 630))
    image.lockFocus()
    color(0xf8f9f5).setFill()
    NSRect(x: 0, y: 0, width: 1200, height: 630).fill()
    let ink = color(0x29332c)
    let brand = color(accent)
    func text(_ value: String, x: CGFloat, y: CGFloat, size: CGFloat, foreground: NSColor, weight: NSFont.Weight = .regular) {
        (value as NSString).draw(at: NSPoint(x: x, y: y), withAttributes: [.font: NSFont.systemFont(ofSize: size, weight: weight), .foregroundColor: foreground])
    }
    text("tian / Apps for Mac", x: 72, y: 555, size: 22, foreground: color(0x596951), weight: .medium)
    NSImage(contentsOfFile: directory + "/" + slug + "-icon.png")!.draw(in: NSRect(x: 62, y: 393, width: 120, height: 120))
    text(name, x: 207, y: 431, size: 45, foreground: ink, weight: .semibold)
    text(first, x: 72, y: 294, size: 51, foreground: ink, weight: .semibold)
    text(second, x: 72, y: 216, size: 51, foreground: brand, weight: .medium)
    text("原生 macOS 应用 · Apple Silicon & Intel", x: 75, y: 154, size: 21, foreground: color(0x596951))
    text("tianguzhe.github.io/" + slug + "/", x: 75, y: 64, size: 21, foreground: color(0x596951))
    brand.withAlphaComponent(0.07).setFill()
    NSBezierPath(ovalIn: NSRect(x: 845, y: 160, width: 280, height: 280)).fill()
    brand.withAlphaComponent(0.12).setStroke()
    let ring = NSBezierPath(ovalIn: NSRect(x: 808, y: 123, width: 354, height: 354))
    ring.lineWidth = 1.5
    ring.stroke()
    text("⌘", x: 908, y: 214, size: 122, foreground: brand, weight: .light)
    image.unlockFocus()
    let bitmap = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: 1200, pixelsHigh: 630, bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: bitmap)
    image.draw(in: NSRect(x: 0, y: 0, width: 1200, height: 630))
    NSGraphicsContext.restoreGraphicsState()
    let target = URL(fileURLWithPath: directory + "/social-" + slug + ".png")
    try bitmap.representation(using: .png, properties: [:])!.write(to: target)
}

if CommandLine.arguments.count < 3 || CommandLine.arguments[2] == "studio" {
    let bitmap = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: 1200, pixelsHigh: 630,
        bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false,
        colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: bitmap)
    color(0xf8f9f5).setFill(); NSRect(x: 0, y: 0, width: 1200, height: 630).fill()
    func label(_ text: String, _ x: CGFloat, _ y: CGFloat, _ size: CGFloat, _ tint: UInt32) {
        (text as NSString).draw(at: NSPoint(x: x, y: y), withAttributes: [.font: NSFont.systemFont(ofSize: size, weight: .medium), .foregroundColor: color(tint)])
    }
    label("tian / Apps for Mac", 72, 552, 22, 0x596951)
    label("小工具，也值得用心。", 72, 433, 53, 0x29332c)
    label("五款原生 Mac 工具，照顾每天的使用。", 75, 376, 23, 0x596951)
    for (index, product) in products.enumerated() {
        let x = CGFloat(78 + index * 214)
        NSImage(contentsOfFile: directory + "/" + product.0 + "-icon.png")!.draw(in: NSRect(x: x, y: 169, width: 120, height: 120))
        label(product.1, x - 4, 128, 17, 0x29332c)
    }
    label("tianguzhe.github.io    ·    macOS 14+    ·    Apple Silicon & Intel", 75, 57, 19, 0x596951)
    NSGraphicsContext.restoreGraphicsState()
    try bitmap.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: directory + "/social.png"))
}
