"""seed categories and products

Revision ID: 0004
Revises: 0003
Create Date: 2026-09-16

Seeds the same 12 products currently hardcoded in frontend/lib/products.ts,
so once that file is swapped for a real fetch() call (Phase 19 frontend
wiring), the data the user sees doesn't change out from under them.
"""
import uuid

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "0004"
down_revision = "0003"
branch_labels = None
depends_on = None


def _category_id(slug: str) -> uuid.UUID:
    # Deterministic, not random — re-running this against a fresh database
    # always produces the same IDs, which is convenient for debugging.
    return uuid.uuid5(uuid.NAMESPACE_URL, f"daltar-category-{slug}")


def _product_id(slug: str) -> uuid.UUID:
    return uuid.uuid5(uuid.NAMESPACE_URL, f"daltar-product-{slug}")


CATEGORIES = [
    {"slug": "pos-hardware", "label": "POS Hardware"},
    {"slug": "computers", "label": "Laptops & Desktops"},
    {"slug": "monitors", "label": "Monitors"},
    {"slug": "servers", "label": "Servers"},
    {"slug": "accessories", "label": "Accessories & Consumables"}
]

PRODUCTS = [
    {
        "sku": "DK-0001",
        "slug": "pos-terminal-t500",
        "name": "T500 Touchscreen POS Terminal",
        "category_slug": "pos-hardware",
        "price": "68000.00",
        "description": "15\" touchscreen all-in-one terminal, built for busy checkout counters.",
        "specs": {
            "Display": "15\" capacitive touch",
            "Processor": "Intel Celeron J1900",
            "RAM": "4GB",
            "Storage": "128GB SSD",
            "Ports": "4x USB, RJ11, RJ45"
        },
        "image_url": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=700&auto=format&fit=crop",
        "stock_quantity": 18
    },
    {
        "sku": "DK-0002",
        "slug": "thermal-receipt-printer-tp80",
        "name": "TP-80 Thermal Receipt Printer",
        "category_slug": "pos-hardware",
        "price": "12500.00",
        "description": "High-speed 80mm thermal printer, USB + Ethernet.",
        "specs": {
            "Print width": "80mm",
            "Speed": "250mm/s",
            "Interface": "USB, Ethernet",
            "Auto-cutter": "Yes"
        },
        "image_url": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=700&auto=format&fit=crop",
        "stock_quantity": 32
    },
    {
        "sku": "DK-0003",
        "slug": "handheld-scanner-hs20",
        "name": "HS-20 Handheld Barcode Scanner",
        "category_slug": "pos-hardware",
        "price": "5800.00",
        "description": "Wireless 1D/2D scanner with charging cradle.",
        "specs": {
            "Type": "1D/2D imager",
            "Connectivity": "2.4GHz wireless + USB cradle",
            "Battery": "12hr continuous scan"
        },
        "image_url": "https://images.unsplash.com/photo-1512418490979-92798cec1380?q=80&w=700&auto=format&fit=crop",
        "stock_quantity": 25
    },
    {
        "sku": "DK-0004",
        "slug": "thermal-paper-rolls-80mm-50pack",
        "name": "80mm Thermal Paper Rolls (50-pack)",
        "category_slug": "accessories",
        "price": "3200.00",
        "description": "Bulk pack of standard 80mm receipt rolls, BPA-free.",
        "specs": {"Width": "80mm", "Roll length": "40m", "Quantity": "50 rolls"},
        "image_url": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=700&auto=format&fit=crop",
        "stock_quantity": 60
    },
    {
        "sku": "DK-0005",
        "slug": "printer-ribbon-black-10pack",
        "name": "Printer Ribbon Cartridges — Black (10-pack)",
        "category_slug": "accessories",
        "price": "4500.00",
        "description": "Compatible black ribbon cartridges for dot-matrix invoice printers.",
        "specs": {
            "Color": "Black",
            "Compatibility": "Universal dot-matrix",
            "Quantity": "10 cartridges"
        },
        "image_url": "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=700&auto=format&fit=crop",
        "stock_quantity": 45
    },
    {
        "sku": "DK-0006",
        "slug": "business-laptop-elitebook-14",
        "name": "EliteBook 14\" Business Laptop",
        "category_slug": "computers",
        "price": "89000.00",
        "description": "Reliable daily-driver laptop for office and field staff.",
        "specs": {
            "CPU": "Intel Core i5, 12th Gen",
            "RAM": "8GB (upgradeable to 16GB)",
            "Storage": "256GB SSD",
            "Display": "14\" FHD"
        },
        "image_url": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=700&auto=format&fit=crop",
        "stock_quantity": 12
    },
    {
        "sku": "DK-0007",
        "slug": "desktop-tower-office-pro",
        "name": "Office Pro Desktop Tower",
        "category_slug": "computers",
        "price": "62000.00",
        "description": "Compact tower for back-office accounting and admin workstations.",
        "specs": {
            "CPU": "Intel Core i5",
            "RAM": "8GB",
            "Storage": "512GB SSD",
            "Form factor": "Micro-tower"
        },
        "image_url": "https://images.unsplash.com/photo-1587831990711-23ca6441447b?q=80&w=700&auto=format&fit=crop",
        "stock_quantity": 15
    },
    {
        "sku": "DK-0008",
        "slug": "monitor-24-fhd",
        "name": "24\" FHD Business Monitor",
        "category_slug": "monitors",
        "price": "15500.00",
        "description": "IPS panel, low blue-light mode, VESA mountable.",
        "specs": {"Size": "24\"", "Resolution": "1920x1080", "Panel": "IPS", "Ports": "HDMI, VGA"},
        "image_url": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=700&auto=format&fit=crop",
        "stock_quantity": 22
    },
    {
        "sku": "DK-0009",
        "slug": "monitor-27-qhd",
        "name": "27\" QHD Monitor",
        "category_slug": "monitors",
        "price": "24000.00",
        "description": "Sharper detail for design, reporting, and dashboard work.",
        "specs": {
            "Size": "27\"",
            "Resolution": "2560x1440",
            "Panel": "IPS",
            "Refresh rate": "75Hz"
        },
        "image_url": "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?q=80&w=700&auto=format&fit=crop",
        "stock_quantity": 0
    },
    {
        "sku": "DK-0010",
        "slug": "rack-server-r340",
        "name": "R340 1U Rack Server",
        "category_slug": "servers",
        "price": "245000.00",
        "description": "Entry-level rack server for branch-level ERP/database hosting.",
        "specs": {
            "CPU": "Intel Xeon E-2314",
            "RAM": "16GB ECC (expandable)",
            "Storage": "2x 1TB HDD (RAID 1)",
            "Form factor": "1U rackmount"
        },
        "image_url": "https://images.unsplash.com/photo-1591405351990-4726e331f141?q=80&w=700&auto=format&fit=crop",
        "stock_quantity": 6
    },
    {
        "sku": "DK-0011",
        "slug": "tower-server-t150",
        "name": "T150 Tower Server",
        "category_slug": "servers",
        "price": "198000.00",
        "description": "Quiet tower-format server, suited to small back-office server rooms.",
        "specs": {"CPU": "Intel Xeon E-2314", "RAM": "16GB ECC", "Storage": "2x 1TB HDD"},
        "image_url": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=700&auto=format&fit=crop",
        "stock_quantity": 8
    },
    {
        "sku": "DK-0012",
        "slug": "network-cash-drawer-nc410",
        "name": "NC-410 Network Cash Drawer",
        "category_slug": "accessories",
        "price": "9800.00",
        "description": "5-note, 8-coin cash drawer with RJ11 printer trigger.",
        "specs": {
            "Compartments": "5 note / 8 coin",
            "Trigger": "RJ11 (printer-driven)",
            "Lock": "Key lock"
        },
        "image_url": "https://images.unsplash.com/photo-1556740749-887f6717d7e3?q=80&w=700&auto=format&fit=crop",
        "stock_quantity": 28
    }
]


def upgrade() -> None:
    categories_table = sa.table(
        "categories",
        sa.column("id", postgresql.UUID(as_uuid=True)),
        sa.column("slug", sa.String),
        sa.column("label", sa.String)
    )
    products_table = sa.table(
        "products",
        sa.column("id", postgresql.UUID(as_uuid=True)),
        sa.column("sku", sa.String),
        sa.column("slug", sa.String),
        sa.column("name", sa.String),
        sa.column("category_id", postgresql.UUID(as_uuid=True)),
        sa.column("price", sa.Numeric),
        sa.column("description", sa.Text),
        sa.column("specs", postgresql.JSONB),
        sa.column("image_url", sa.String),
        sa.column("stock_quantity", sa.Integer),
        sa.column("is_active", sa.Boolean)
    )

    op.bulk_insert(
        categories_table,
        [
            {"id": _category_id(c["slug"]), "slug": c["slug"], "label": c["label"]}
            for c in CATEGORIES
        ]
    )

    op.bulk_insert(
        products_table,
        [
            {
                "id": _product_id(p["slug"]),
                "sku": p["sku"],
                "slug": p["slug"],
                "name": p["name"],
                "category_id": _category_id(p["category_slug"]),
                "price": p["price"],
                "description": p["description"],
                "specs": p["specs"],
                "image_url": p["image_url"],
                "stock_quantity": p["stock_quantity"],
                "is_active": True
            }
            for p in PRODUCTS
        ]
    )


def downgrade() -> None:
    op.execute("DELETE FROM products WHERE sku LIKE 'DK-%'")
    op.execute(
        "DELETE FROM categories WHERE slug IN ("
        "'pos-hardware', 'computers', 'monitors', 'servers', 'accessories'"
        ")"
    )
